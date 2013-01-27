using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoMapperExperiments
{
    class Program
    {
        static void Main(string[] args)
        {
            var customer = new Customer
            {
                Name = "George Costanza"
            };
            var order = new Order
            {
                Customer = customer
            };
            var bosco = new Product
            {
                Name = "Bosco",
                Price = 4.99m
            };
            order.AddOrderLineItem(bosco, 15);
            
            Mapper.CreateMap<Order, OrderDto>();
            OrderDto dto = Mapper.Map<Order, OrderDto>(order);
        }
    }

    public class Order
    {
        private readonly IList<OrderLineItem> _orderLineItems = new List<OrderLineItem>();

        public Customer Customer { get; set; }

        public OrderLineItem[] GetOrderLineItems()
        {
            return _orderLineItems.ToArray();
        }

        public void AddOrderLineItem(Product product, int quantity)
        {
            _orderLineItems.Add(new OrderLineItem(product, quantity));
        }

        public decimal GetTotal()
        {
            return _orderLineItems.Sum(li => li.GetTotal());
        }
    }

    //This is a comment

    public class Product
    {
        public decimal Price { get; set; }
        public string Name { get; set; }
    }

    public class OrderLineItem
    {
        public OrderLineItem(Product product, int quantity)
        {
            Product = product;
            Quantity = quantity;
        }

        public Product Product { get; private set; }
        public int Quantity { get; private set; }

        public decimal GetTotal()
        {
            return Quantity * Product.Price;
        }
    }

    public class Customer
    {
        public string Name { get; set; }
    }

    public class OrderDto
    {
        public string CustomerName { get; set; }
        public decimal Total { get; set; }
    }


}
