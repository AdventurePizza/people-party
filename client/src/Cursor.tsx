// @ts-nocheck
import React from 'react';
import { makeStyles, Avatar, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    sizeBig: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
    sizeSmall: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  }),
);

export const Cursor = (props) => {
  const {
    avatar,
    username,
    userCursorRef
  } = props;
  const classes = useStyles();
  return (
    <div ref={userCursorRef} className={props.className} style={{ position: "absolute", overflow: "hidden", zIndex: 99 }}>
      <Avatar variant="rounded" src={avatar} alt="change avatar" />
      <div style={{ textAlign: "center" }} >{username} </div>
    </div>
  );
};

Cursor.defaultProps = {
  shouldShowIsActive: true
};

export const Cursors = (props) => {
  const {
    avatar,
    x,
    y,
    username,
  } = props;
  const classes = useStyles();
  return (
    <div className={props.className} style={{ position: "absolute", top: (y + 20), left: x + 20, overflow: "hidden", zIndex: 99 }}>
      <Avatar variant="rounded" src={avatar} alt="change avatar" />
      <div style={{ textAlign: "center" }} >{username} </div>
    </div>
  );
};

