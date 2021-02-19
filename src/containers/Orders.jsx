import React, { useEffect, useState } from 'react'
import ordersList from '../orders_list';
import OrderCard from '../components/OrderCard';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // get,set orders
    setOrders(ordersList);
  }, [])

  const add = (orderId, item) => {
      let {originalItem, orderIndex, itemIndex, _items, _order, _orders} = prepareCalc(orderId, item)
        _items[itemIndex].quantity = `${++originalItem.quantity}`;
        _items[itemIndex].total = `${(Number(item["unit-price"]) * Number(_items[itemIndex].quantity).toFixed(2))}`;
        _order.items = _items;
        _order.total = `${Number(_order.total) - Number(originalItem.total) + Number(_items[itemIndex].total)}`;
        _orders[orderIndex] = _order;
        setOrders([..._orders])
  }

  const remove = (orderId, item) => {
    let {originalItem, orderIndex, itemIndex, _items, _order, _orders} = prepareCalc(orderId, item)
        // remove item if quantity is 1
        _items[itemIndex].total = `${originalItem.total - originalItem["unit-price"]}`
        _items[itemIndex].quantity > 1 ? _items[itemIndex].quantity = `${--originalItem.quantity}` : _items.splice(itemIndex, 1);
        _order.items = _items;
        _order.total = `${Number(_order.total) - Number(originalItem["unit-price"])}`;
        _orders[orderIndex] = _order;
        setOrders([..._orders])
  }

  const prepareCalc = (orderId, item) => {
    const originalItem = JSON.parse(JSON.stringify(item));
    let _orders = JSON.parse(JSON.stringify(orders));
    const orderIndex = _orders.findIndex(o => o.id === orderId);
    // find order and item, return needed values
    if (orderIndex > -1) {
      const _order = _orders[orderIndex];
      const itemIndex = _order.items.findIndex(i => i["product-id"] === originalItem["product-id"]);
      if (itemIndex > -1) {
        const _items = orders[orderIndex].items;
        return {
          originalItem,
          orderIndex,
          itemIndex,
          _items,
          _order,
          _orders        
        }
      }
    }
  }

  return (
    <ul className="orders-list">
      {orders && orders.map((o, i) => <li key={`order-${i}`}>
        <OrderCard order={o} add={add} remove={remove} />
      </li>)}
    </ul>
  )
}

export default Orders

