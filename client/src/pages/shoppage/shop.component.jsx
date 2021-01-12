import React, { useEffect, lazy } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

const CollectionsOverviewContainer = lazy(() => import('../../components/collections-overview/collections-overview.container'));
const CollectionPageContainer = lazy(() => import('../collection/collection.container'));


const ShopPage = ({ fetchCollections, match, collections }) => {  
  useEffect(() => {
    if (!collections) {
      fetchCollections(); 
    }
  }, [fetchCollections, collections]) 

  return (
    <div className='shop-page'>
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  );
}

const mapStateToProps = ({ shop: { collections }}) => ({
  collections: collections
});

const mapDispatchToProps = dispatch => ({
  fetchCollections: () => dispatch(fetchCollectionsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
