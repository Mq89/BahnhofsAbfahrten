// @flow
import './SettingsModal.scss';
import { closeSettings, setSearchType, setTime, setTraewelling, setZoomReihung } from 'client/actions/config';
import { connect } from 'react-redux';
import BrowserstackThanks from './BrowserstackThanks';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import type { AppState } from 'AppState';

type StateProps = {|
  open: boolean,
  timeConfig: boolean,
  searchType: string,
  traewellingConfig: boolean,
  zoomReihungConfig: boolean,
|};

type DispatchProps = {|
  closeSettings: typeof closeSettings,
  setTime: typeof setTime,
  setSearchType: typeof setSearchType,
  setTraewelling: typeof setTraewelling,
  setZoomReihung: typeof setZoomReihung,
|};

type Props = {|
  ...StateProps,
  ...DispatchProps,
|};

class SettingsModal extends React.PureComponent<Props> {
  handleTimeChange = e => {
    this.props.setTime(e.target.checked);
  };
  handleTraewellingChange = e => {
    this.props.setTraewelling(e.target.checked);
  };
  changeSearchType = e => {
    this.props.setSearchType(e.target.value);
  };
  handleZoomReihungChange = e => {
    this.props.setZoomReihung(e.target.checked);
  };
  render() {
    const { open, closeSettings, timeConfig, searchType, traewellingConfig, zoomReihungConfig } = this.props;

    return (
      <Dialog fullWidth open={open} onClose={closeSettings}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent className="SettingsModal">
          <FormControlLabel
            control={
              <Switch checked={traewellingConfig} value="traewellingConfig" onChange={this.handleTraewellingChange} />
            }
            label="Zeige Traewelling Link"
          />
          <FormControlLabel
            control={<Switch checked={timeConfig} value="timeConfig" onChange={this.handleTimeChange} />}
            label="Zeige neue Ankunft bei Verspätung"
          />
          <FormControlLabel
            control={
              <Switch checked={zoomReihungConfig} value="zoomReihungConfig" onChange={this.handleZoomReihungChange} />
            }
            label="Zeige Reihung maximal groß"
          />
          <FormControlLabel
            control={
              <NativeSelect value={searchType} name="searchType" onChange={this.changeSearchType}>
                <option value="favendo">Favendo</option>
                <option value="openDB">Open DB</option>
                <option value="favOpenDB">Open DB + Favendo</option>
                <option value="openData">Open Data</option>
                <option value="openDataOffline">Open Data Offline</option>
                <option value="hafas">HAFAS</option>
                <option value="dbNav">DB Navigator</option>
              </NativeSelect>
            }
            label="API zur Stationssuche"
          />
          <BrowserstackThanks />
        </DialogContent>
      </Dialog>
    );
  }
}

export default connect<AppState, Function, {||}, StateProps, DispatchProps>(
  state => ({
    open: state.config.open,
    timeConfig: state.config.time,
    searchType: state.config.searchType,
    traewellingConfig: state.config.traewelling,
    zoomReihungConfig: state.config.zoomReihung,
  }),
  {
    closeSettings,
    setTime,
    setSearchType,
    setTraewelling,
    setZoomReihung,
  }
)(SettingsModal);
