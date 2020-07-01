import React, { Component } from "react";
import { graphql } from "react-apollo"; // To bind Apollo with React Component
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";

/* Styles */
import "../App.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

/* Queries */
import { getProductsQuery } from "../queries/queries";

/* Component */
import EmptyMessage from "./EmptyMessage";
import Modal from "./Modal";

class ProductList extends Component {
  state = { show: false, id: null };
  showModal = (product) => {
    this.setState({ show: true });
    this.setState({ id: product.id });
    document.body.style.overflow = "hidden";
  };

  hideModal = () => {
    this.setState({ show: false });
    document.body.style.overflow = "unset";
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  addProducts(product) {
    product.isInBasket = true;
    this.props.addProduct(product);
  }

  handleRemoveClick(product) {
    this.props.removeProduct(product.id);
    product.isInBasket = false;
  }

  displayProduct() {
    let data = this.props.data;
    return data.products.map((product) => {
      if (product.id === this.state.id)
        return (
          <div
            key={product.id}
            className="modal-product col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          >
            <div className="modal-product-card">
              <div className="modal-product-name">
                <p key={product.id}>{product.name}</p>
              </div>
              <div className="top-product-card">
                <div className="left-side-product-card">
                  <div className="modal-product-image">
                    <div className="wrapper">
                      <img
                        key={product.id}
                        src={product.img_url}
                        alt="product"
                      />
                    </div>
                  </div>
                </div>
                <div className="right-side-product-card">
                  <div className="modal-price-and-add-button">
                    <p key={product.id}>£{product.price.toFixed(2)}</p>
                    <p
                      className={
                        product.isInBasket ? "visible cross" : "invisible"
                      }
                      onClick={() => this.handleRemoveClick(product)}
                    >
                      <i className="fas fa-times-circle"></i>
                    </p>
                    <button
                      className={
                        product.isInBasket
                          ? "btn disable-button"
                          : "btn btn-success"
                      }
                      onClick={() => this.addProducts(product)}
                    >
                      {product.isInBasket ? "ADDED" : "ADD TO BASKET"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="bottom-product-card">
                <p className="product-desc">
                  <p className="desc-title">Product information</p>
                  Lorem ipsum dolor sit amet, nibh atqui apeirian eum ad, cu sed
                  quem quodsi, dicant facilis sed id. Omnes mandamus
                  concludaturque vel ad.
                </p>
              </div>
            </div>
          </div>
        );
    });
  }

  displayProducts() {
    let data = this.props.data;
    if (data.loading) {
      return <p>Loading Products...</p>;
    } else {
      return data.products.map((product) => {
        return (
          <div
            key={product.id}
            className="product col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
          >
            <div className="product-card">
              <div
                className="product-modal"
                onClick={() => this.showModal(product)}
              >
                <div className="product-name">
                  <p key={product.id}>{product.name}</p>
                </div>
                <div className="product-image">
                  <div className="wrapper">
                    <img key={product.id} src={product.img_url} alt="product" />
                  </div>
                </div>
              </div>
              <div className="price-and-add-button">
                <p key={product.id}>£{product.price.toFixed(2)}</p>
                <p
                  className={product.isInBasket ? "visible cross" : "invisible"}
                  onClick={() => this.handleRemoveClick(product)}
                >
                  <i className="fas fa-times-circle"></i>
                </p>
                <button
                  className={
                    product.isInBasket
                      ? "btn disable-button"
                      : "btn btn-success"
                  }
                  onClick={() => this.addProducts(product)}
                >
                  {product.isInBasket ? "ADDED" : "ADD TO BASKET"}
                </button>
              </div>
            </div>
          </div>
        );
      });
    }
  }

  render() {
    if (this.props.data.products) {
      return (
        <div className="product-container container">
          <div className="intro col-xs-12 col-sm-12 col-md-12 ">
            <p className="tw-intro">
              Here at <strong>TechWorld</strong> we sell only the very finest
              gaming mice on the market today with just one aim; to make it as
              easy as possible for a gamer to find the right rodent for their
              intended usage and budget..
            </p>
          </div>
          <div className="row">{this.displayProducts()}</div>
          <Modal
            id={this.state.id}
            show={this.state.show}
            hideModal={this.hideModal}
            children={this.displayProduct()}
          ></Modal>
        </div>
      );
    }
    return (
      <div>
        <EmptyMessage message="Products loading... Please wait or refresh the page." />
        <div className="d-flex justify-content-center">
          <Loader type="ThreeDots" color="black" height={80} width={80} />
        </div>
      </div>
    );
  }
}

ProductList.propTypes = {
  addProduct: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  removeProduct: PropTypes.func,
};

export default graphql(getProductsQuery)(ProductList); // query result accessible via props
