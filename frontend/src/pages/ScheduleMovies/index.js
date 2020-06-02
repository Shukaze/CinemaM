import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { search } from '../../Utils';
import { MoviesSchedule, Pagination } from '../../components';
import { Input, Loading, ListGroup } from '../../components/common';

import { getMovies } from '../../actions/moviesAction'; 

class ScheduleForm extends Component {
  state = {
    genres: [],
    pageSize: 12,
    currentPage: 1,
    searchFilter: ''
  };

  componentDidMount() {
    this.props.getMovies();
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value, currentPage: 1 });
  }
  onPageChange = (page) => {
    this.setState({ currentPage: page });
  }

  render() {
    const { 
      currentPage, 
      searchFilter,
      pageSize
    } = this.state;

    const { movies } = this.props; 
    let filteredMovies = [];

    if(_.isEmpty(movies)) { 
      return <div className='background-container pt-5'> <Loading/> </div>
    }

    // Checking for searched item if nothing searched it will just set it to allMovies
    filteredMovies = search(movies, searchFilter, 'title');
    return (
     <div className='background-container'>
        <div className='mx-5 py-5'>
          <div className='row'>
            
          
            <div className='col-lg-10 col-sm-12'>
              <Input onChange={event => this.handleChange('searchFilter', event.target.value)}  label='Search Movie' iconClass='fas fa-search' placeholder='Search...'/>
              {
                !! filteredMovies
                ? <MoviesSchedule pageSize={pageSize} currentPage={currentPage} movies={filteredMovies}/>  
                : <h1 className='text-white'>No Movies</h1>
              }
              <br/>
              <Pagination
                itemsCount={filteredMovies.length}
                pageSize={pageSize}
                onPageChange={this.onPageChange}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    movies: state.movie.movies
  }
}
const mapDispatchToProps = dispatch => {
  return { 
    getMovies: () => dispatch(getMovies())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ScheduleForm);
