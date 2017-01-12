package com.cegeka.data.elasticsearch.repository;

import com.cegeka.data.elasticsearch.model.Cat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface CatRepository extends ElasticsearchRepository<Cat, String> {
    Page<Cat> findAll(Pageable pageable);
    List<Cat> findCatsByAge(Integer age);
    List<Cat> findCatsByName(String name);
    List<Cat> findCatsBySkillsIn(List skills);
}
