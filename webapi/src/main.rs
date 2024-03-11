mod auth;
mod middleware;
mod repo;
mod view_models;

use crate::auth::{encode_token, get_public_jwk, Jwks};
use axum::extract::State;
use axum::http::{HeaderMap, HeaderValue, StatusCode};
use axum::middleware::from_extractor;
use axum::response::IntoResponse;
use axum::routing::{get, post};
use axum::{Extension, Json, Router};
use repo::user_repo::{DynUserRepo, UserRepoImpl};
use std::sync::Arc;
use tokio::net::TcpListener;

use crate::middleware::AuthorizationMiddleware;
use crate::view_models::User;

#[derive(Clone)]
struct AppState {
    pub user_repo: DynUserRepo,
}

#[tokio::main]
async fn main() {
    let app_state = AppState {
        user_repo: Arc::new(UserRepoImpl) as DynUserRepo,
    };

    let jwks = Jwks(vec![get_public_jwk()]);

    let router = Router::new()
        .route("/api/account", get(account))
        .route_layer(from_extractor::<AuthorizationMiddleware>())
        .route("/api/new", get(create_account))
        .route("/api/login", post(login))
        .layer(Extension(jwks))
        .with_state(app_state);

    let listener = TcpListener::bind("127.0.0.1:8000").await.unwrap();

    println!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, router).await.unwrap();
}

async fn account(
    Extension(claims): Extension<auth::Authorized>,
    State(state): State<AppState>,
) -> impl IntoResponse {
    let name_claim = claims.0.username;
    println!("claim username: {:?}", name_claim);
    let user_account = state.user_repo.find(name_claim).await.unwrap();
    Json(user_account).into_response()
}

async fn login(State(state): State<AppState>, Json(request): Json<User>) -> impl IntoResponse {
    let user = state
        .user_repo
        .find(request.username.clone())
        .await
        .unwrap();

    if user.password == request.password {
        let token = encode_token(request.username.clone());
        let mut headers = HeaderMap::new();
        headers.insert(
            axum::http::header::AUTHORIZATION,
            HeaderValue::try_from(token).unwrap(),
        );
        (headers,).into_response()
    } else {
        (StatusCode::UNAUTHORIZED).into_response()
    }
}

async fn create_account(State(state): State<AppState>) -> impl IntoResponse {
    let acc = state.user_repo.create().await.unwrap();
    Json(acc)
}
