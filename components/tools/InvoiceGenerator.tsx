
import React, { useState } from 'react';

const InvoiceGenerator: React.FC = () => {
  const [items, setItems] = useState([{ id: 1, desc: '', qty: 1, price: 0 }]);
  const [vendor, setVendor] = useState({ name: '', email: '' });
  const [client, setClient] = useState({ name: '', email: '' });

  const addItem = () => setItems([...items, { id: Date.now(), desc: '', qty: 1, price: 0 }]);
  const removeItem = (id: number) => setItems(items.filter(i => i.id !== id));
  
  const updateItem = (id: number, key: string, val: any) => {
    setItems(items.map(i => i.id === id ? { ...i, [key]: val } : i));
  };

  const subtotal = items.reduce((acc, i) => acc + (i.qty * i.price), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handlePrint = () => window.print();

  return (
    <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-clay-card dark:shadow-clay-card-dark print:shadow-none print:p-0">
      <div className="flex justify-between items-start mb-8 print:mb-4">
        <h2 className="text-3xl font-black text-primary">INVOICE</h2>
        <div className="text-right">
          <p className="text-slate-400 font-bold">#INV-{Date.now().toString().slice(-6)}</p>
          <p className="text-sm text-slate-400">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 mb-12 print:gap-4 print:mb-6">
        <div>
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">From</h3>
          <input placeholder="Your Company" className="w-full text-lg font-bold border-none bg-transparent p-0 focus:ring-0" value={vendor.name} onChange={e => setVendor({...vendor, name: e.target.value})} />
          <input placeholder="Email Address" className="w-full text-sm text-slate-500 border-none bg-transparent p-0 focus:ring-0" value={vendor.email} onChange={e => setVendor({...vendor, email: e.target.value})} />
        </div>
        <div className="text-right">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">To</h3>
          <input placeholder="Client Name" className="w-full text-lg font-bold border-none bg-transparent p-0 text-right focus:ring-0" value={client.name} onChange={e => setClient({...client, name: e.target.value})} />
          <input placeholder="Client Email" className="w-full text-sm text-slate-500 border-none bg-transparent p-0 text-right focus:ring-0" value={client.email} onChange={e => setClient({...client, email: e.target.value})} />
        </div>
      </div>

      <div className="mb-8">
        <table className="w-full">
          <thead className="border-b-2 border-slate-100 dark:border-slate-700">
            <tr>
              <th className="text-left py-2 text-xs font-black text-slate-400 uppercase">Item</th>
              <th className="text-right py-2 text-xs font-black text-slate-400 uppercase w-20">Qty</th>
              <th className="text-right py-2 text-xs font-black text-slate-400 uppercase w-32">Price</th>
              <th className="text-right py-2 text-xs font-black text-slate-400 uppercase w-32">Total</th>
              <th className="w-10 print:hidden"></th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-slate-50 dark:border-slate-800">
                <td className="py-4">
                  <input className="w-full border-none bg-transparent focus:ring-0 text-sm font-semibold" placeholder="Description" value={item.desc} onChange={e => updateItem(item.id, 'desc', e.target.value)} />
                </td>
                <td className="py-4">
                  <input type="number" className="w-full border-none bg-transparent focus:ring-0 text-right text-sm" value={item.qty} onChange={e => updateItem(item.id, 'qty', parseInt(e.target.value))} />
                </td>
                <td className="py-4">
                  <input type="number" className="w-full border-none bg-transparent focus:ring-0 text-right text-sm" value={item.price} onChange={e => updateItem(item.id, 'price', parseFloat(e.target.value))} />
                </td>
                <td className="py-4 text-right text-sm font-bold">${(item.qty * item.price).toFixed(2)}</td>
                <td className="py-4 text-right print:hidden">
                  <button onClick={() => removeItem(item.id)} className="text-red-300 hover:text-red-500"><span className="material-symbols-outlined text-sm">delete</span></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addItem} className="mt-4 text-primary font-bold text-xs flex items-center gap-1 print:hidden">
          <span className="material-symbols-outlined text-sm">add_circle</span> Add Item
        </button>
      </div>

      <div className="flex justify-end">
        <div className="w-64 space-y-2">
          <div className="flex justify-between text-sm text-slate-500"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm text-slate-500"><span>Tax (10%)</span><span>${tax.toFixed(2)}</span></div>
          <div className="flex justify-between text-xl font-black text-primary pt-2 border-t border-slate-100"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </div>
      </div>

      <div className="mt-12 flex gap-4 print:hidden">
        <button onClick={handlePrint} className="flex-grow h-12 bg-primary text-white rounded-full font-bold shadow-lg">Save as PDF / Print</button>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
