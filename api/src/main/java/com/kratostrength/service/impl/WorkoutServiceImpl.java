package com.kratostrength.service.impl;

import com.kratostrength.domain.Workout;
import com.kratostrength.repository.WorkoutRepository;
import com.kratostrength.service.WorkoutService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Workout}.
 */
@Service
@Transactional
public class WorkoutServiceImpl implements WorkoutService {

    private final Logger log = LoggerFactory.getLogger(WorkoutServiceImpl.class);

    private final WorkoutRepository workoutRepository;

    public WorkoutServiceImpl(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    @Override
    public Workout save(Workout workout) {
        log.debug("Request to save Workout : {}", workout);
        return workoutRepository.save(workout);
    }

    @Override
    public Workout update(Workout workout) {
        log.debug("Request to update Workout : {}", workout);
        return workoutRepository.save(workout);
    }

    @Override
    public Optional<Workout> partialUpdate(Workout workout) {
        log.debug("Request to partially update Workout : {}", workout);

        return workoutRepository
            .findById(workout.getId())
            .map(existingWorkout -> {
                if (workout.getRepetitions() != null) {
                    existingWorkout.setRepetitions(workout.getRepetitions());
                }
                if (workout.getNegatives() != null) {
                    existingWorkout.setNegatives(workout.getNegatives());
                }
                if (workout.getTime() != null) {
                    existingWorkout.setTime(workout.getTime());
                }

                return existingWorkout;
            })
            .map(workoutRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Workout> findAll(Pageable pageable) {
        log.debug("Request to get all Workouts");
        return workoutRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Workout> findOne(Long id) {
        log.debug("Request to get Workout : {}", id);
        return workoutRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Workout : {}", id);
        workoutRepository.deleteById(id);
    }
}
