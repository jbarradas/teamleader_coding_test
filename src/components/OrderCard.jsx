import React from 'react'
import PropTypes from 'prop-types'

function OrderCard({ order: { id, items, total }, add, remove }) {
  return (
    <div className="order-card">
      <span className="order-id">{`Order Number: ${id}`}</span>
      <ul className="order-items">
        {items && items.map((item, i) =>
          <li key={`order-item-${i}`}>
            <span className="order-item">
            {`Product: ${item["product-id"]} - Quantity: ${item.quantity} - Unit Price: ${item["unit-price"]} - Total: ${item.total}`}
            </span>
            {" "}
            <button type="button" onClick={() => add(id, item)}>+1</button>
            <button type="button" onClick={() => remove(id, item)}>-1</button>
          </li>
        )}
      </ul>
      <div className="order-total">{total}</div>
    </div>
  )
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      "product-id": PropTypes.string.isRequired,
      quantity: PropTypes.string.isRequired,
      "unit-price": PropTypes.string.isRequired,
      total: PropTypes.string.isRequired
    })),
    total: PropTypes.string.isRequired
  }).isRequired
}

export default OrderCard

