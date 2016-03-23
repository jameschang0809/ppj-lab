﻿using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;
using MovieAngularJSApp.Models;

namespace MovieAngularJSApp.API
{
    [Route("api/[controller]")]
    public class MoviesController : Controller
    {
        private readonly MoviesAppContext _dbContext;

        public MoviesController(MoviesAppContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<Movie> Get()
        {
            return _dbContext.Movies;
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            var movie = _dbContext.Movies.FirstOrDefault(x => x.Id == id);
            if (movie == null)
                return new HttpNotFoundResult();
            else
                return new ObjectResult(movie);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Movie movie)
        {
            if (ModelState.IsValid)
            {
                if (movie.Id == 0)
                {
                    _dbContext.Movies.Add(movie);
                    _dbContext.SaveChanges();
                    return new ObjectResult(movie);
                }
                else
                {
                    var original = _dbContext.Movies.FirstOrDefault(x => x.Id == movie.Id);
                    if (original == null)
                        return new HttpNotFoundResult();

                    original.Title = movie.Title;
                    original.Director = movie.Director;
                    _dbContext.SaveChanges();
                    return new ObjectResult(original);
                }
            }

            return new BadRequestObjectResult(ModelState);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var movie = _dbContext.Movies.FirstOrDefault(x => x.Id == id);
            if (movie == null)
                return new HttpNotFoundResult();

            _dbContext.Movies.Remove(movie);
            _dbContext.SaveChanges();
            return new HttpStatusCodeResult(200);
        }
    }
}
