package com.gebczyk.photos;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class PhotosController {
    private Collection<Photo> db = new ArrayList<>(); // Collection con la información de la DB

    public PhotosController() {
        db.add(new Photo(1, "hello.jpg")); // Añadimos un valor a la DB
    }

    @GetMapping("/photos") // Listado de todas las fotos
    public Collection<Photo> get() {
        return db;
    }

    @GetMapping("/photos/{id}") // Buscar foto por ID
    public Photo getPhotoById(@PathVariable String id) {
        for (Photo photo : db) {
            if (String.valueOf(photo.getId()).equals(id)) {
                return photo;
            }
        }
    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Photo not found"); // En el caso de no ser encontrada retorna un 404

    }
}
