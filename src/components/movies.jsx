import React, { Component } from 'react';
import {getMovies} from '../services/fakeMovieService'
import Pagination from './pagination';
import patinateProcess from '../utils/paginate'

class Movie extends Component {
    state = { 
        movies:getMovies(),
        pageSize:5,
        currentPage:1
     }
     
     
     handlePageChange= page =>{
         this.setState({ currentPage : page})
     }

    render() { 
        const {length : count} = this.state.movies;
        const {pageSize, currentPage, movies:allMovies } = this.state;
        const movies = patinateProcess(allMovies,currentPage,pageSize);

        return <div className="container">
            <h3>Movie Component</h3>
            <h4>Showing {count} Movies in the database</h4>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Director</th>
                        <th>Distributor</th>
                        <th>Source</th>
                        <th/>   
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie=>(                        
                        <tr key={movie._id}>
                            <td>{movie.Title}</td>
                            <td>{movie.Director}</td>
                            <td>{movie.Distributor}</td>
                            <td>{movie.Source}</td>
                            <td><input className = "btn btn-warning" type="button" value="Delete" key={movie}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination 
                itemsCount={count} 
                pageSize={pageSize} 
                onPageChange={this.handlePageChange}
                currentPage={currentPage}/>
        </div>;
    }
}
 
export default Movie;