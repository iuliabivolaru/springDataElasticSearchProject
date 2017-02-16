package com.cegeka.data.elasticsearch.service;

import com.cegeka.data.elasticsearch.model.Cat;
import com.cegeka.data.elasticsearch.repository.CatRepository;
import org.elasticsearch.action.update.UpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.query.UpdateQuery;
import org.springframework.data.elasticsearch.core.query.UpdateQueryBuilder;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.elasticsearch.common.xcontent.XContentFactory.jsonBuilder;

@Service
public class CatService {

    @Autowired
    ElasticsearchTemplate elasticsearchTemplate;

    @Autowired
    private CatRepository repository;

    public Page<Cat> findCats(Pageable pageable) { return repository.findAll(pageable); }

    public List<Cat> findCatsByAge(Integer age) {
        return repository.findCatsByAge(age);
    }

    public List<Cat> findCatsByName(String name) {
        return repository.findCatsByName(name);
    }

    public List<Cat> findCatsBySkillsIn(List skills) {
        return repository.findCatsBySkillsIn(skills);
    }

    public void addCat(Cat cat) {
        repository.save(cat);
    }

    public void updateCat(Cat cat) {
       repository.save(cat);
    }

    public void deleteCat(String id) {
        repository.delete(id);
    }
}
