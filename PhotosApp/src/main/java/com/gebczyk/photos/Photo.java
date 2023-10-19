package com.gebczyk.photos;
public class Photo {
    
    private int id;
    private String fileName;

    public Photo() {
    }

    public Photo(int id, String fileName) {
        this.id = id;
        this.fileName = fileName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
}