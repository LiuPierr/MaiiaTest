import React from 'react'
import {Text, View, FlatList, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native'
import {connect} from "react-redux"
import actions from "../store/actions"
import {Colors} from "@utils/colors"

interface ListItem {
    userId: number,
    id: number,
    title: string,
    body: string
}

interface Props {
    fetchList: () => Promise<void>,
    data: ListItem[]
}

interface States {
    status: "loading" | "ready",
    currentPage: number,
    itemsPerPage: number,
    displayedData: ListItem[] | [],
    filterTitle: string,
}

const ITEMS_PER_PAGE = 10

class List extends React.PureComponent<Props, States> {
    constructor(props: Props) {
        super(props)
        this.state = {
            status: "loading",
            currentPage: 1,
            itemsPerPage: ITEMS_PER_PAGE,
            displayedData: this.props.data && this.props.data.slice(0, 1 * ITEMS_PER_PAGE) || [],
            filterTitle: "",
        }
    }

    componentDidMount() {
        const {fetchList} = this.props
        const {currentPage, itemsPerPage} = this.state
        fetchList().then((res) => {
            this.setState({status: "ready", displayedData: res.slice(0, currentPage * itemsPerPage)})
        })
    }

    loadData = (): Promise<any> => {
        const {fetchList, data} = this.props
        const {itemsPerPage} = this.state

        this.setState({status: "loading"})
        return fetchList().then(() => {
            this.setState({displayedData: data.slice(0, itemsPerPage), filterTitle: "", status: "ready"})
        })
    }

    renderItem = ({item}: { item: ListItem }) => {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.body}</Text>
            </View>
        )
    }

    onRefresh = () => {
        this.setState({
            status: "loading",
            currentPage: 1,
            itemsPerPage: ITEMS_PER_PAGE,
            displayedData: this.props.data.slice(0, ITEMS_PER_PAGE)
        }, () => {
            this.setState({status: "ready"})
        })
    }

    keyExtractor = (item: ListItem) => item.id.toString()

    loadMore = () => {
        const {data} = this.props
        const {currentPage, itemsPerPage} = this.state
        this.setState(prevState => ({
            displayedData: [...prevState.displayedData, ...data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)],
            currentPage: prevState.currentPage + 1
        }))
    }

    renderFooter = () => {
        if (this.props.data && this.props.data.length !== this.state.displayedData.length) {
            return (
                <View style={styles.footer}>
                    <TouchableOpacity style={{padding: 10}} onPress={this.loadMore}>
                        <Image
                            resizeMode={"contain"}
                            style={styles.footerLogo}
                            source={require('@images/refresh.png')}
                        />
                    </TouchableOpacity>
                </View>
            )
        }
        return null
    }

    onChangeFilterText = (input: string) => {
        const filtered = this.props.data.filter(item => {
            return item.title.includes(input.toLowerCase())
        })
        this.setState({
            filterTitle: input,
            displayedData: filtered
        })
    }

    renderHeader = () => (
        <TextInput
            style={styles.textinput}
            onChangeText={this.onChangeFilterText}
            value={this.state.filterTitle}
        />
    )

    render() {
        return (
            <View style={styles.container}>
                {this.state.displayedData.length > -1 ?
                    <View>
                        <FlatList
                            ListHeaderComponent={this.renderHeader}
                            keyExtractor={this.keyExtractor}
                            data={this.state.displayedData}
                            renderItem={this.renderItem}
                            initialNumToRender={this.state.itemsPerPage}
                            onEndReachedThreshold={0.3}
                            ListFooterComponent={this.renderFooter}
                            onEndReached={this.loadMore}
                            onRefresh={this.onRefresh}
                            refreshing={this.state.status === "loading"}
                            extraData={this.state.filterTitle}
                        />
                    </View>
                    :
                    <View style={styles.placeholderContainer}>
                        <Text style={styles.placeholderText}>Aucune donnée disponible. Veuillez réessayer</Text>
                        <TouchableOpacity onPress={this.loadData}>
                            <Image
                                resizeMode={"contain"}
                                style={styles.placeholderLogo}
                                source={require('@images/refresh.png')}
                            />
                        </TouchableOpacity>
                    </View>

                }
            </View>
        )
    }

}

const mapStateToProps = (state: any) => ({
    data: state.data
})
const mapDispatchToProps = (dispatch: any) => ({
    fetchList: () => dispatch(actions.fetchList()),
})
export default connect(mapStateToProps, mapDispatchToProps)(List)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    itemContainer: {
        borderBottomColor: "grey",
        borderBottomWidth: StyleSheet.hairlineWidth,
        //padding: 10
    },
    placeholderContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    placeholderLogo: {
        width: 50,
        height: 50,
        tintColor: Colors.pink,
    },
    placeholderText: {
        marginBottom: 10,
        fontWeight: "bold",
        color: Colors.pink
    },
    title: {
        fontSize: 17,
        color: Colors.blue,
        marginBottom: 8
    },
    textinput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
    },
    description: {
        fontSize: 14
    },
    footer: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey"
    },
    footerTouchable: {
        padding: 10
    },
    footerLogo: {
        width: 40,
        tintColor: "white"
    }
})