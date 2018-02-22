import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { fetchPinnedStatuses } from '../../actions/pin_statuses';
import Column from '../ui/components/column';
import ColumnBackButtonSlim from '../../components/column_back_button_slim';
import StatusList from '../../components/status_list';
import { defineMessages, injectIntl } from 'react-intl';
import ImmutablePureComponent from 'react-immutable-pure-component';

const messages = defineMessages({
  heading: { id: 'column.pins', defaultMessage: 'Pinned post' },
});

const mapStateToProps = state => ({
  statusIds: state.getIn(['status_lists', 'pins', 'items']),
  hasMore: !!state.getIn(['status_lists', 'pins', 'next']),
});

@connect(mapStateToProps)
@injectIntl
export default class PinnedStatuses extends ImmutablePureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    statusIds: ImmutablePropTypes.list.isRequired,
    intl: PropTypes.object.isRequired,
    hasMore: PropTypes.bool.isRequired,
  };

  componentWillMount () {
    this.props.dispatch(fetchPinnedStatuses());
  }

  handleHeaderClick = () => {
    this.column.scrollTop();
  }

  setRef = c => {
    this.column = c;
  }

  render () {
    const { intl, statusIds, hasMore } = this.props;

    return (
      <Column icon='thumb-tack' heading={intl.formatMessage(messages.heading)} ref={this.setRef}>
        <ColumnBackButtonSlim />
        <StatusList
          statusIds={statusIds}
          scrollKey='pinned_statuses'
          hasMore={hasMore}
        />
      </Column>
    );
  }

}
