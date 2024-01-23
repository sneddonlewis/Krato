package com.kratostrength.web.rest;

import static com.kratostrength.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.kratostrength.IntegrationTest;
import com.kratostrength.domain.Workout;
import com.kratostrength.repository.WorkoutRepository;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link WorkoutResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class WorkoutResourceIT {

    private static final Integer DEFAULT_REPETITIONS = 1;
    private static final Integer UPDATED_REPETITIONS = 2;

    private static final Integer DEFAULT_NEGATIVES = 1;
    private static final Integer UPDATED_NEGATIVES = 2;

    private static final ZonedDateTime DEFAULT_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String ENTITY_API_URL = "/api/workouts";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restWorkoutMockMvc;

    private Workout workout;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Workout createEntity(EntityManager em) {
        Workout workout = new Workout().repetitions(DEFAULT_REPETITIONS).negatives(DEFAULT_NEGATIVES).time(DEFAULT_TIME);
        return workout;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Workout createUpdatedEntity(EntityManager em) {
        Workout workout = new Workout().repetitions(UPDATED_REPETITIONS).negatives(UPDATED_NEGATIVES).time(UPDATED_TIME);
        return workout;
    }

    @BeforeEach
    public void initTest() {
        workout = createEntity(em);
    }

    @Test
    @Transactional
    void createWorkout() throws Exception {
        int databaseSizeBeforeCreate = workoutRepository.findAll().size();
        // Create the Workout
        restWorkoutMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(workout)))
            .andExpect(status().isCreated());

        // Validate the Workout in the database
        List<Workout> workoutList = workoutRepository.findAll();
        assertThat(workoutList).hasSize(databaseSizeBeforeCreate + 1);
        Workout testWorkout = workoutList.get(workoutList.size() - 1);
        assertThat(testWorkout.getRepetitions()).isEqualTo(DEFAULT_REPETITIONS);
        assertThat(testWorkout.getNegatives()).isEqualTo(DEFAULT_NEGATIVES);
        assertThat(testWorkout.getTime()).isEqualTo(DEFAULT_TIME);
    }

    @Test
    @Transactional
    void createWorkoutWithExistingId() throws Exception {
        // Create the Workout with an existing ID
        workout.setId(1L);

        int databaseSizeBeforeCreate = workoutRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restWorkoutMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(workout)))
            .andExpect(status().isBadRequest());

        // Validate the Workout in the database
        List<Workout> workoutList = workoutRepository.findAll();
        assertThat(workoutList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllWorkouts() throws Exception {
        // Initialize the database
        workoutRepository.saveAndFlush(workout);

        // Get all the workoutList
        restWorkoutMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(workout.getId().intValue())))
            .andExpect(jsonPath("$.[*].repetitions").value(hasItem(DEFAULT_REPETITIONS)))
            .andExpect(jsonPath("$.[*].negatives").value(hasItem(DEFAULT_NEGATIVES)))
            .andExpect(jsonPath("$.[*].time").value(hasItem(sameInstant(DEFAULT_TIME))));
    }

    @Test
    @Transactional
    void getWorkout() throws Exception {
        // Initialize the database
        workoutRepository.saveAndFlush(workout);

        // Get the workout
        restWorkoutMockMvc
            .perform(get(ENTITY_API_URL_ID, workout.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(workout.getId().intValue()))
            .andExpect(jsonPath("$.repetitions").value(DEFAULT_REPETITIONS))
            .andExpect(jsonPath("$.negatives").value(DEFAULT_NEGATIVES))
            .andExpect(jsonPath("$.time").value(sameInstant(DEFAULT_TIME)));
    }

    @Test
    @Transactional
    void getNonExistingWorkout() throws Exception {
        // Get the workout
        restWorkoutMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingWorkout() throws Exception {
        // Initialize the database
        workoutRepository.saveAndFlush(workout);

        int databaseSizeBeforeUpdate = workoutRepository.findAll().size();

        // Update the workout
        Workout updatedWorkout = workoutRepository.findById(workout.getId()).get();
        // Disconnect from session so that the updates on updatedWorkout are not directly saved in db
        em.detach(updatedWorkout);
        updatedWorkout.repetitions(UPDATED_REPETITIONS).negatives(UPDATED_NEGATIVES).time(UPDATED_TIME);

        restWorkoutMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedWorkout.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedWorkout))
            )
            .andExpect(status().isOk());

        // Validate the Workout in the database
        List<Workout> workoutList = workoutRepository.findAll();
        assertThat(workoutList).hasSize(databaseSizeBeforeUpdate);
        Workout testWorkout = workoutList.get(workoutList.size() - 1);
        assertThat(testWorkout.getRepetitions()).isEqualTo(UPDATED_REPETITIONS);
        assertThat(testWorkout.getNegatives()).isEqualTo(UPDATED_NEGATIVES);
        assertThat(testWorkout.getTime()).isEqualTo(UPDATED_TIME);
    }

    @Test
    @Transactional
    void putNonExistingWorkout() throws Exception {
        int databaseSizeBeforeUpdate = workoutRepository.findAll().size();
        workout.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWorkoutMockMvc
            .perform(
                put(ENTITY_API_URL_ID, workout.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(workout))
            )
            .andExpect(status().isBadRequest());

        // Validate the Workout in the database
        List<Workout> workoutList = workoutRepository.findAll();
        assertThat(workoutList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchWorkout() throws Exception {
        int databaseSizeBeforeUpdate = workoutRepository.findAll().size();
        workout.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWorkoutMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(workout))
            )
            .andExpect(status().isBadRequest());

        // Validate the Workout in the database
        List<Workout> workoutList = workoutRepository.findAll();
        assertThat(workoutList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamWorkout() throws Exception {
        int databaseSizeBeforeUpdate = workoutRepository.findAll().size();
        workout.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWorkoutMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(workout)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Workout in the database
        List<Workout> workoutList = workoutRepository.findAll();
        assertThat(workoutList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateWorkoutWithPatch() throws Exception {
        // Initialize the database
        workoutRepository.saveAndFlush(workout);

        int databaseSizeBeforeUpdate = workoutRepository.findAll().size();

        // Update the workout using partial update
        Workout partialUpdatedWorkout = new Workout();
        partialUpdatedWorkout.setId(workout.getId());

        partialUpdatedWorkout.negatives(UPDATED_NEGATIVES).time(UPDATED_TIME);

        restWorkoutMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWorkout.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWorkout))
            )
            .andExpect(status().isOk());

        // Validate the Workout in the database
        List<Workout> workoutList = workoutRepository.findAll();
        assertThat(workoutList).hasSize(databaseSizeBeforeUpdate);
        Workout testWorkout = workoutList.get(workoutList.size() - 1);
        assertThat(testWorkout.getRepetitions()).isEqualTo(DEFAULT_REPETITIONS);
        assertThat(testWorkout.getNegatives()).isEqualTo(UPDATED_NEGATIVES);
        assertThat(testWorkout.getTime()).isEqualTo(UPDATED_TIME);
    }

    @Test
    @Transactional
    void fullUpdateWorkoutWithPatch() throws Exception {
        // Initialize the database
        workoutRepository.saveAndFlush(workout);

        int databaseSizeBeforeUpdate = workoutRepository.findAll().size();

        // Update the workout using partial update
        Workout partialUpdatedWorkout = new Workout();
        partialUpdatedWorkout.setId(workout.getId());

        partialUpdatedWorkout.repetitions(UPDATED_REPETITIONS).negatives(UPDATED_NEGATIVES).time(UPDATED_TIME);

        restWorkoutMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWorkout.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedWorkout))
            )
            .andExpect(status().isOk());

        // Validate the Workout in the database
        List<Workout> workoutList = workoutRepository.findAll();
        assertThat(workoutList).hasSize(databaseSizeBeforeUpdate);
        Workout testWorkout = workoutList.get(workoutList.size() - 1);
        assertThat(testWorkout.getRepetitions()).isEqualTo(UPDATED_REPETITIONS);
        assertThat(testWorkout.getNegatives()).isEqualTo(UPDATED_NEGATIVES);
        assertThat(testWorkout.getTime()).isEqualTo(UPDATED_TIME);
    }

    @Test
    @Transactional
    void patchNonExistingWorkout() throws Exception {
        int databaseSizeBeforeUpdate = workoutRepository.findAll().size();
        workout.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWorkoutMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, workout.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(workout))
            )
            .andExpect(status().isBadRequest());

        // Validate the Workout in the database
        List<Workout> workoutList = workoutRepository.findAll();
        assertThat(workoutList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchWorkout() throws Exception {
        int databaseSizeBeforeUpdate = workoutRepository.findAll().size();
        workout.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWorkoutMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(workout))
            )
            .andExpect(status().isBadRequest());

        // Validate the Workout in the database
        List<Workout> workoutList = workoutRepository.findAll();
        assertThat(workoutList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamWorkout() throws Exception {
        int databaseSizeBeforeUpdate = workoutRepository.findAll().size();
        workout.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWorkoutMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(workout)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Workout in the database
        List<Workout> workoutList = workoutRepository.findAll();
        assertThat(workoutList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteWorkout() throws Exception {
        // Initialize the database
        workoutRepository.saveAndFlush(workout);

        int databaseSizeBeforeDelete = workoutRepository.findAll().size();

        // Delete the workout
        restWorkoutMockMvc
            .perform(delete(ENTITY_API_URL_ID, workout.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Workout> workoutList = workoutRepository.findAll();
        assertThat(workoutList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
