import React, { Component } from 'react';

import SearchResult from './searchOverlay/SearchResult';

export default class SearchOverlay extends Component {
  
  render() {
    if(this.props.queryString === '') {
      return(
        <div
            className = "search-overlay"
            style = { this.props.isOverlay ? { display: 'block' } : { display: 'none' } }
        >
          <div
            className = "search-results-view"
          >
            <div
              className = "search-results-sections"
            >
              <div
                className = "search-results-sections-header"
              >
                <h4>Search</h4>
              </div>
              <div
                className = "search-results-sections-content"
              >
                Start to type
              </div>

            </div>
          </div>
        </div>
      )
    } else if(this.props.queryString !== '' && !this.props.quickSearch.isQuerying && this.props.quickSearch.results && this.props.quickSearch.results.length === 0) {
      return (
        <div
            className = "search-overlay"
            style = { this.props.isOverlay ? { display: 'block' } : { display: 'none' } }
        >
          <div
            className = "search-results-view"
          >
            <div
              className = "search-results-sections"
            >
              <div
                className = "search-results-sections-header"
              >
                <h4>Search</h4>
              </div>
              <div
                className = "search-results-sections-content"
              >
                No results by your query
              </div>

            </div>
          </div>
        </div>
      )
    } else if(!this.props.quickSearch.isQuerying && this.props.quickSearch.results && this.props.quickSearch.results.length !== 0) {
      let results = this.props.quickSearch.results;

      return(
        <div
            className = "search-overlay"
            style = { this.props.isOverlay ? { display: 'block' } : { display: 'none' } }
        >
          <div
            className = "search-results-view"
          >
            <div
              className = "search-results-sections"
            >
              <div
                className = "search-results-sections-header"
              >
                <h4>Search</h4>
              </div>
              <div
                className = "search-results-sections-content"
              >
                { results.map(( result, index ) => (
                      <SearchResult
                        hideSearchOverlay = { this.props.hideSearchOverlay }
                        hideSearchField   = { this.props.hideSearchField }
                        key  = { result._id }
                        id   = { result._id }
                        name = { result.name }
                      />
                    )
                  )
                }
              </div>

            </div>
          </div>
        </div>
      )
    } else if(this.props.quickSearch.isQuerying) {
      return(
        <div
            className = "search-overlay"
            style = { this.props.isOverlay ? { display: 'block' } : { display: 'none' } }
        >
          <div
            className = "search-results-view"
          >
            <div
              className = "search-results-sections"
            >
              <div
                className = "search-results-sections-header"
              >
                <h4>Search</h4>
              </div>
              <div
                className = "search-results-sections-content"
              >
                <img className = "loading-animation" src="assets/images/loading.gif" />
              </div>

            </div>
          </div>
        </div>
      )
    }
  }
}
