import React from 'react';
import { AutoSizer, Table, Column, SortDirection } from 'react-virtualized';
import { sortBy as lodashSortBy } from 'lodash';
import './List.scss';

export class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortBy: this.props.columns[0].dataKey || this.props.columns[0].label,
      sortDirection: SortDirection.DESC,
      sortedItems: lodashSortBy(
        this.props.items,
        this.props.columns[0].dataKey || this.props.columns[0].label
      )
    };

    this._sort = this._sort.bind(this);
  }

  componentDidUpdate(prevProps) {
    const prev = prevProps.items || null;
    const next = this.props.items || null;
    if (prev !== next) {
      this.setState({
        sortedItems: lodashSortBy(this.props.items, this.state.sortBy)
      });
    }
  }

  _sort(sortProps) {
    const { sortBy, sortDirection } = sortProps;
    const sortedItems = this._getSortedList(
      this.state.sortedItems,
      sortBy,
      sortDirection
    );

    if (sortedItems.length > 0) {
      this.setState({
        sortBy,
        sortDirection,
        sortedItems
      });
    }
  }

  _getSortedList(items, sortBy, sortDirection) {
    const key = sortBy;
    const currencyKeys = [
      'Average Covered Charges',
      'Average Total Payments',
      'Average Medicare Payments'
    ];
    const sorted = lodashSortBy(items, item =>
      currencyKeys.includes(key)
        ? parseFloat(item[key].replace(/[$|,]/g, ''))
        : item[key]
    );
    return sortDirection === SortDirection.ASC ? sorted : sorted.reverse();
  }

  render() {
    const { sortBy, sortDirection, sortedItems } = this.state;
    const { columns, windowSize } = this.props;
    const cols = columns.map((columnProps, index) => (
      <Column
        key={index}
        width={1}
        dataKey={columnProps['dataKey'] || columnProps.label}
        {...columnProps}
      />
    ));

    const calculatedHeight = windowSize && {
      height: windowSize.height - (windowSize.width < 767 ? 64 : 80)
    };

    return (
      <AutoSizer
        className="ReactVirtualized__AutoSizer"
        style={calculatedHeight}
      >
        {() => (
          <Table
            headerHeight={40}
            rowCount={sortedItems.length}
            rowGetter={({ index }) => sortedItems[index]}
            rowHeight={40}
            width={2600}
            height={calculatedHeight.height}
            sort={this._sort}
            sortBy={sortBy}
            sortDirection={sortDirection}
          >
            {cols}
          </Table>
        )}
      </AutoSizer>
    );
  }
}
