import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {FixedSizeList, ListChildComponentProps} from 'react-window';
import {Paper} from '@material-ui/core';

interface VirtualizedListProps {
    players: Array<string>,
    socket: any
}

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: '100%',
//       height: 400,
//       maxWidth: 300,
//       backgroundColor: theme.palette.background.paper,
//     },
//   }),
// );

// const handleInvite = (opponentName : string) => {
//   console.log("oN" + opponentName);
//   this.props.socket.emit("client_server_request_user", { username: opponentName });
// };

// function renderRow(props: ListChildComponentProps) {
//   const { data, index, style } = props;
//   console.log(data);
//   return (
//      <ListItem button onClick={() => handleInvite(data.playerArray[index])} style={style} key={index}>
//       <ListItemText primary={`${data.playerArray[index]}`} />
//     </ListItem>
//   );
// }

class VirtualizedList extends React.Component<VirtualizedListProps> {
    constructor(props: VirtualizedListProps) {
        super(props);
        this.handleInvite = this.handleInvite.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    handleInvite(opponentName: string) {
        console.log("oN" + opponentName);
        this.props.socket.emit("client_server_request_user", {username: opponentName});
    };

    renderRow(props: ListChildComponentProps) {
        const {data, index, style} = props;
        console.log(data);
        return (
            <ListItem button onClick={() => this.handleInvite(data.playerArray[index])} style={style} key={index}>
                <ListItemText primary={`${data.playerArray[index]}`}/>
            </ListItem>
        );
    }

    render() {
        return (
            <Paper style={{height: 200, maxWidth: 300, width: "50%", margin: "0 auto"}} elevation={3}>
                <FixedSizeList height={200} width={300} itemSize={46} itemCount={this.props.players.length}
                               itemData={{playerArray: this.props.players}}>
                    {this.renderRow}
                </FixedSizeList>
            </Paper>
        );
    }
}

export default VirtualizedList;

// export default function VirtualizedList(props: VirtualizedListProps) {
//   const {players} = props;
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <FixedSizeList height={400} width={300} itemSize={46} itemCount={players.length} itemData = {{ playerArray: players }}>
//         {renderRow}
//       </FixedSizeList>
//     </div>
//   );
// }
