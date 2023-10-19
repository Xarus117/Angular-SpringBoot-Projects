package com.gebczyk.photos;
import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/photos")
public class PhotosController {
    private Collection<Photo> db = new ArrayList<>();

      public PhotosController() {
        Photo examplePhoto = new Photo();
        examplePhoto.setId(1);
        examplePhoto.setFileName("example.jpg");
        db.add(examplePhoto);
    }

    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Photo create(@RequestBody Photo photo) {
        int randomId = (int) UUID.randomUUID().getMostSignificantBits();
        photo.setId(randomId);
        db.add(photo);
        return photo;
    }

    @GetMapping("/{id}")
    public Photo getById(@PathVariable int id) {
        return db.stream()
                .filter(photo -> photo.getId() == id)
                .findFirst()
                .orElse(null);
    }

    @GetMapping
    public Collection<Photo> getAll() {
        return db;
    }

    @PutMapping("/{id}")
    public Photo update(@PathVariable int id, @RequestBody Photo updatedPhoto) {
        for (Photo photo : db) {
            if (photo.getId() == id) {
                // Update the existing photo with new data
                photo.setFileName(updatedPhoto.getFileName());
                return photo;
            }
        }
        return null; // Photo not found
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int id) {
        db.removeIf(photo -> photo.getId() == id);
    }
}
