import React from 'react';
import axios from 'axios';
import RatingBreakdown from './RatingBreakdown.jsx';
import ReviewTile from './ReviewTile.jsx';
import ProductBreakDown from './ProductBreakDown.jsx';
import ReviewForm from './ReviewForm.jsx';

class RatingsReviews extends React.Component {
  constructor(props) {
    super(props);
    this.tempReview = 17763;
    this.state = {
      loadedReviews: false,
      loadedMeta: false,
      product_id: this.tempReview,
      filters: [],
      showReviewModal: false,
    };
    this.showReviewModal = this.showReviewModal.bind(this);
    this.closeReviewModal = this.closeReviewModal.bind(this);
  }

  componentDidMount() {
    axios
      .get(`/api/reviews/?product_id=${this.tempReview}`)
      .then((data) => {
        this.setState({
          loadedReviews: true,
          product_id: this.tempReview,
          reviews: data.data.results,
        });
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get(`/api/reviews/meta?product_id=${this.tempReview}`)
      .then((data) => {
        this.setState({ meta: data.data, loadedMeta: true });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  showReviewModal() {
    this.setState({ showReviewModal: true });
  }

  closeReviewModal() {
    this.setState({ showReviewModal: false });
  }

  render() {
    const { loadedMeta, loadedReviews, showReviewModal } = this.state;
    if (loadedReviews === false || loadedMeta === false || this.props.productData == null) {
      return <div />;
    }
    // Get two reviews.
    const tiles = [];
    for (let i = 0; i < 2; i += 1) {
      tiles.push(<ReviewTile item={product_id} key={i} review={this.state.reviews[i]} />);
    }

    const { product_id, filters, meta } = this.state;
    return (
      <div>
        <div className="rr-parent" id="overview-link">
          Ratings & Reviews
          <div className="rr-rating-big" />
          {tiles}
        </div>
        <div className="rr-rating-breakdown">
          <RatingBreakdown productId={product_id} filters={filters} />
        </div>
        <div className="rr-product-breakdown-container">
          <ProductBreakDown characteristics={this.state.meta.characteristics} />
        </div>
        <div>
          <ReviewForm
            productTitle={this.props.productData['name']}
            metaData={meta}
            showModal={showReviewModal}
            closeModal={this.closeReviewModal}
          />
          <button type="button" onClick={this.showReviewModal}>
            show modal
          </button>
        </div>
      </div>
    );
  }
}

export default RatingsReviews;
