import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLeads, deleteLead } from '../../actions/leads';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export class Leads extends Component {
    static propTypes = {
        leads: PropTypes.array.isRequired,
        getLeads: PropTypes.func.isRequired,
        deleteLead: PropTypes.func.isRequired
    }

    componentDidMount(){
        this.props.getLeads();
    }



  render() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 10 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'message', headerName: 'Message', width: 130 },
        
      ];
    const paginationModel = { page: 0, pageSize: 5 };
    return (
        <Fragment>
            <h2>Leads</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 100 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Message</TableCell>
                        <TableCell align="right">Date</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.props.leads.map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.id}
                        </TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.message}</TableCell>
                        <TableCell align="right">{new Date(row.created_at).toDateString()}</TableCell>
                        <TableCell allign = "center"><Button variant='contained' color='error' onClick={this.props.deleteLead.bind(this,row.id)}>Delete</Button></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
  }
}

const mapStateToProps = state=>({
    leads: state.leads.leads
})

export default connect(mapStateToProps,{getLeads, deleteLead})(Leads);
