package com.edusasse.backendapi.controller;

import java.util.List;
import java.util.stream.Stream;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.edusasse.backendapi.model.Crud;
import com.edusasse.backendapi.repository.CrudRepository;
import com.edusasse.backendapi.web.exception.MyResourceNotFoundException;
import com.edusasse.backendapi.web.hateoas.PaginatedResultsRetrievedEvent;

@RestController
@RequestMapping(value = "/cruds")
@CrossOrigin
public class CrudController {

	@Autowired
	private ApplicationEventPublisher eventPublisher;

	@Autowired
	private CrudRepository repository;	 
	
	@PostConstruct
	public void ini(){
        Stream.of("Test 1", "Test 2", "Test 3").forEach(name ->
                repository.save(new Crud(name))
        );
	}
	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
	public Crud createCrud(@RequestBody Crud crud, UriComponentsBuilder ucBuilder) {
		return repository.save(crud);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("id") final Long id) {
		repository.delete(id);
    }
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @ResponseStatus(HttpStatus.OK)
    public Crud update(@PathVariable("id") final Long id, @RequestBody final Crud crud) {
		crud.setId(id);
        return repository.save(crud);
    }
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Crud findById(@PathVariable("id") final Long id, final HttpServletResponse response) {
		return repository.findOne(id);
    }
	
	@RequestMapping(value="/pageable", params = { "page", "size" }, method = RequestMethod.GET)
	@ResponseBody
	public List<Crud> findPaginated(@RequestParam("page") int page, @RequestParam("size") int size,
			UriComponentsBuilder uriBuilder, HttpServletResponse response) {

		Page<Crud> resultPage = repository.findAll(new PageRequest(page, size));
		if (page > resultPage.getTotalPages()) {
			throw new MyResourceNotFoundException();
		}
		eventPublisher.publishEvent(new PaginatedResultsRetrievedEvent<Crud>(Crud.class, uriBuilder, response, page,
				resultPage.getTotalPages(), size));

		return resultPage.getContent();
	}
	
	@RequestMapping(value="/all", method = RequestMethod.GET)
	@ResponseBody
	public List<Crud> getAll(UriComponentsBuilder uriBuilder, HttpServletResponse response) {
		final List<Crud> result = repository.findAll();
		return result;
	}

}