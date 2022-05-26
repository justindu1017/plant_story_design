import React, { Component } from 'react'

export default class ErrHandel extends Component {
    
      render() {
        if (this.state.hasError) {
          // 你可以 render 任何客製化的 fallback UI
          return <h1>Something went wrong.</h1>;
        }

      }
}
