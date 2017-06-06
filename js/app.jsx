import React from "react";
import ReactDOM from "react-dom";
require('../scss/style.scss');

document.addEventListener('DOMContentLoaded', function() {
    
    class Header extends React.Component {
        render() {
            return  <header>
                        <div className = "main-width">
                            <div className = "logo"></div>
                            <div className = "title">
                                <h1>Top strzelcy Serie A</h1>
                                <p>sezon 2015/2016</p>
                            </div>
                        </div>
                    </header>
        }
    }
    
    class Table extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                scorers: []
            }
        }
        
        componentDidMount(){
            this.loadData();
        }
        
        loadData = () => {
            const myHeaders = new Headers({
                'X-Mashape-Authorization': 'kxSXmUymofmshFHhhKxWOSJpqJsJp1I3zNnjsnqKwhITAiC1zw'
            });
            const myInit = { method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default'
            }
            fetch('https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues/serie-a/seasons/15-16/topscorers', myInit).then(resp => {
                if(resp.ok)
                    return resp.json();
                else 
                    throw new Error('Network error');
            }).then(resp => {
                this.setState({
                    scorers: resp.data.topscorers.slice(0, 10)
                })
            }).catch(err => {
                console.log('Error', err);
            });
        }
        
        render() {
            if (!this.state.scorers.length) {
                return  <section className = "topscorers">
                            <div className = "main-width">
                                <h2>Loading...</h2>
                            </div>
                        </section>
            } else {
                return  <section className = "topscorers">
                            <div className = "main-width">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>POZYCJA</th>
                                            <th>ZAWODNIK</th>
                                            <th>GOLE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.scorers.map((e, i) => {
                                            return  <tr key = { this.state.scorers[i].identifier }>
                                                        <td>{ i + 1 }</td>
                                                        <td><div className = "divider">{ this.state.scorers[i].fullname }</div></td>
                                                        <td>{ this.state.scorers[i].goals }</td>
                                                    </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </section>
            }
        }
    }
    
    class Footer extends React.Component {
        render() {
            return  <footer>
                        <div className = "main-width">
                            <div className = "footer-info">powered by PGS</div>
                        </div>
                    </footer>
        }
    }
    
    class App extends React.Component {
        render() {
            return  <div>
                        <Header />
                        <Table />
                        <Footer />
                    </div>
        }
    }
    
    ReactDOM.render(
        <App />,
        document.querySelector('.app')
    );
    
});