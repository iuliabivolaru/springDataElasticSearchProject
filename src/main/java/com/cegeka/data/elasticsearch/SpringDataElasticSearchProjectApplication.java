package com.cegeka.data.elasticsearch;

import com.cegeka.data.elasticsearch.model.Cat;
import com.cegeka.data.elasticsearch.model.Skill;
import com.cegeka.data.elasticsearch.service.CatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

import static java.util.Arrays.asList;

@SpringBootApplication
public class SpringDataElasticSearchProjectApplication implements CommandLineRunner {

    @Autowired
    private CatService catService;

    public void run(String... args) throws Exception {
        System.out.println("Save cats");
        createAndSaveCats();
        System.out.println("Find cat by name 'Mike'");
        findCat("Mike");
        System.out.println("Find cat by name 'John'");
        findCat("John");
        System.out.println("Find the cats by age");
        findCatsByAge(3);
    }

    private void findCatsByAge(int age) {
        List catList = catService.findCatsByAge(age);
        System.out.println("Cats list: " + catList);
    }

    private void findCat(String name) {
        List catList = catService.findCatsByName(name);
        System.out.println("Cat list: " + catList);
    }

    private void createAndSaveCats() {
        Cat mike = new Cat("01", "Mike", 3);
        Skill jumpHighSkill = new Skill("jump high", 1);
        Skill singSkill = new Skill("sing", 1);
        mike.setSkills(asList(jumpHighSkill, singSkill));
        Cat johnFirst = new Cat("02", "John First", 3);
        Cat johnSecond = new Cat("03", "John Second", 3);
        Cat sue = new Cat("04", "Sue", 3);
        storeCatsInRepository(mike, johnFirst, johnSecond, sue);
    }

    private void storeCatsInRepository(Cat mike, Cat johnFirst, Cat johnSecond, Cat sue) {
        catService.addCat(mike);
        catService.addCat(johnFirst);
        catService.addCat(johnSecond);
        catService.addCat(sue);
    }

    public static void main(String[] args) {
        SpringApplication.run(SpringDataElasticSearchProjectApplication.class, args);
    }
}
