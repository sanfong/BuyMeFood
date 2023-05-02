import React, { Component } from 'react';
import { Container } from 'reactstrap';
import  NavMenu  from './NavMenu';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div style={{ backgroundColor: '#FE9F60', height:'100%' }}>
                <NavMenu />
                <Container tag="main"  >
                    {this.props.children}
                </Container>
            </div>
        );
    }
}
