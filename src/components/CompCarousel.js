import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

let styles = {
    margin: 'auto',
    width: '500px'
};

class CompCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			items: this.props.myList,
        }
    }

    // Mounting
    componentWillMount() {
        console.log('componentWillMount');
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    // Updating
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps ' + nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate ' + nextProps + ', ' + nextState);
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate ' + nextProps + ', ' + nextState);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate ' + prevProps + ', ' + prevState + ', ' + snapshot);
    }
    
    // Unmounting
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    // Define my functions
    Function = (param) => {
        return param + ' new';
    }

    render() {
        const listItems = this.state.items.map((item) =>
            <div>
                <img src={ item.image } alt={ this.Function(item.title) } />
                <p className="legend">{ this.Function(item.title) } </p>
            </div>
        );

        return (
            <div style={ styles }>
                <Carousel>
                    { listItems }
                </Carousel>
            </div>
        );
    }    
}

export default CompCarousel;