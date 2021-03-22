import React, { useState, useEffect } from 'react';
import {Snavbar} from '../nav-bar/StyleNavBar';
import LogoutIndex from '../login/logout/LogoutIndex';
import { Button } from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Http from '../../http/apiService';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const columns = [
  { id: 'userName', label: 'User Name', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 170 },
  {
    id: 'role',
    label: 'Role',
    minWidth: 100,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'level',
    label: 'Level',
    minWidth: 100,
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    label: 'Action',
    minWidth: 170,
  }
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 800,
  },
});

export default function AdminView() {
let history = useHistory();
//------------------------------
    useEffect(() => {
        GetUser();
    }, []);
const [data, setData] = useState([]);

const GetUser = async () => {
        const resp = await Http.getSth('/users');
        setData(resp.data)
    }
//------------------------

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleUpdate = (id) => {
      const url = '/update/'+id;
      history.push(url);
  }
  
   const handleDelete =async (id) => {
      const url ='/users/'+id;
      const resp = await Http.deleteSth(url);
      alert("Succesfulllll!!!!!!")
      window.location.reload();

  }
    const Component = (id,name) => {
        return (
        <>
        <Button onClick={() => handleUpdate(name)}>Update</Button>
        {/* Delete Button */}
        <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
            Delete
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box p={2}>
              <Typography>Are U Sure???????????</Typography>
              <Button onClick={() => handleDelete(id)} >Yes</Button>
              <Button>No</Button>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
        </>
    )
    }
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                        {column.label === 'Action' && Component(row.id,row.userName)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}