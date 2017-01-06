/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
} from 'react-native';


class FetchComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			status: 'initial',
		};
	}
	componentDidMount() {
		this.fetch();
	}
	fetch() {
		this.setState({
			status: 'initial',
		}, () => setTimeout(() => {

			this.doFetch();
		}, this.props.delay))
	}
	doFetch() {
		this.setState({
			status: 'fetching',
		}, () => {
			fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
				.then((res) => {
					if (res.ok) {
						this.setState({
							status: 'THEN BLOCK ::: OK'
						});
					} else if (res.json) {
						// console.log('fetch failed', res);
						res.json()
							.then((data) => {
								this.setState({
									status: 'THEN BLOCK ::: data',
								});
							}, err => {
								this.setState({
									status: 'THEN BLOCK :: ' + err,
								});
							});
					} else {
						this.setState({
							status: 'THEN BLOCK :: NOT_OK :: ' + res,
						})
					}

				}).catch(e => {
					this.setState({
						status: 'CATCH_BLOCK :: ' + e,
					});
				});
		})
	}
	restart() {
		this.fetch();
	}
	render() {
		return (
			<View style={{ padding: 24 }}>
				<Text>Fetch {this.props.id}</Text>
				<Text>status ::: {this.state.status}</Text>
			</View>
		)
	}
}


export default class FetchExample extends Component {
	constructor(props) {
	  super(props);

	  this.state = {
	  	count: 15,
	  	withoutDelay: 0,
	  };
	  this.onAdd = this.onAdd.bind(this);
	  this.onRestart = this.onRestart.bind(this);
	}
	onAdd() {
		this.setState({
			withoutDelay: this.state.withoutDelay + 1,
		});
	}
	onRestart() {
		this.forEach(i => {
			this.refs[i].restart();
		});
	}
	forEach(cb, count = this.state.count) {
		let results = [];
		for (let i = 0; i < count; i++) {
			results.push(cb(i));
		}
		return results;
	}
	render() {
		return (
			<View style={styles.container}>
				<ScrollView contentContainerStyle={{ alignItems: 'center' }}>
					{this.forEach(i =>
						<FetchComponent key={i} ref={i} delay={i * 300} />
					)}
					{this.forEach(i =>
						<FetchComponent key={i} ref={i} delay={0} />,
						this.state.withoutDelay,
					)}
					<TouchableOpacity onPress={this.onAdd} style={{ padding: 24 }}>
						<Text>
							Add
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={this.onRestart} style={{ padding: 24 }}>
						<Text>
							Restart
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		// alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});

AppRegistry.registerComponent('FetchExample', () => FetchExample);
