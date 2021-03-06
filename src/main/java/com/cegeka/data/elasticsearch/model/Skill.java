package com.cegeka.data.elasticsearch.model;

public class Skill {

    private String name;
    private int experience;

    public Skill() {
    }

    public Skill(String name, int experience) {
        this.name = name;
        this.experience = experience;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    @Override
    public String toString() {
        return "Skill{" +
                "name='" + name + '\'' +
                ", experience=" + experience +
                '}';
    }
}
