import React,{useState} from 'react';
import { Container,Grow,Grid,Paper,AppBar,TextField,Button } from '@material-ui/core';
import {useDispatch} from 'react-redux';
import { useHistory,useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import {getPostBySearch} from '../../actions/posts';
import Pagination from '../Pagination';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();
    const page = query.get('page') || 1; // if no page chosen we must be on the first page
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search,setSearch] = useState('');
    const [tags,setTags] = useState([]);

    const searchPost = () => {
        if(search.trim() || tags){
            // dispatch => fetch search post
            dispatch(getPostBySearch({search, tags: tags.join(',')}));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }else{
            history.push('/');
        }
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){ //enter key
            searchPost();
        }
    }

    const handleAdd = (tag) => {
        setTags([...tags,tag]);
    }

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag)=>tag!== tagToDelete));
    }

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>

                    {/* it will occupy full space in extra small devices and 6/12 in small and 9/12 in medium devices */}
                    <Grid item xs={12} sm={6} md={9}> 
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>

                        <AppBar className={classes.appBarSearch} position="static" color='inherit' >
                            <TextField 
                                name="search"
                                variant="outlined"
                                label="Search Memories"
                                onKeyPress={handleKeyPress}
                                fullWidth
                                value={search}
                                onChange={(e)=> setSearch(e.target.value) }
                            />

                            <ChipInput
                                style={{ margin:'10px 0' }}
                                value={tags}
                                onAdd={(tag)=>handleAdd(tag)}
                                onDelete={(tag)=>handleDelete(tag)}
                                label="Search Tags"
                                variant="outlined"
                            />

                            <Button onClick={searchPost} variant="contained" className={classes.searchButton} color="primary" >
                                Search
                            </Button>

                        </AppBar>

                        <Form currentId={currentId} setCurrentId={setCurrentId} />

                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination} >
                                <Pagination page={page} />
                            </Paper>
                        )}

                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home
