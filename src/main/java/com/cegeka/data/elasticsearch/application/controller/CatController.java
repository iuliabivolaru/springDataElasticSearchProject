package com.cegeka.data.elasticsearch.application.controller;

import com.cegeka.data.elasticsearch.application.transferobject.StringTO;
import com.cegeka.data.elasticsearch.model.Cat;
import com.cegeka.data.elasticsearch.service.CatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.ValidationException;
import java.util.List;
import java.util.logging.Logger;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/veterinary")
public class CatController {

    static Logger logger = Logger.getLogger(CatController.class.getName());

    @Autowired
    CatService catService;

    @RequestMapping(method = POST)
    public ResponseEntity<Cat> postNewCat(@RequestBody Cat cat) {
        logger.info("Creating new cat " + cat);
        try {
            catService.addCat(cat);

            return new ResponseEntity(HttpStatus.CREATED);
            //TODO remove validation exception
        } catch (ValidationException e) {
            return new ResponseEntity(new StringTO(e.getMessage()), HttpStatus.BAD_REQUEST);

        }
    }

    @RequestMapping(method = GET)
    public ResponseEntity getCats() {
        logger.info("Getting new cat ");
        Pageable pageable = new PageRequest( 0, 100 );
        Page<Cat> listOfCats = catService.findCats(pageable);
        if (listOfCats.getContent().isEmpty())
            return new ResponseEntity(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(listOfCats.getContent(), HttpStatus.OK);

    }

    @RequestMapping(method = PUT)
    public ResponseEntity<Cat> putCat(@RequestBody Cat cat) {
        logger.info("Updating cat "+ cat);
        catService.updateCat(cat);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(method = DELETE)
    public ResponseEntity<Cat> deleteCat(@RequestBody Cat cat) {
        catService.deleteCat(cat);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
