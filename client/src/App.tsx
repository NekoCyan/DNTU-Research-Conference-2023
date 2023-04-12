import React from 'react';

function App() {
  return (
    <div className="app">
      <p><i className="twa twa-flag-vietnam"></i> Chào mừng đến với DNTU Conference</p>
      <p>Một số nút trong app, xem App.tsx để biết thêm chi tiết</p>
      <button className='btn btn-primary rounded-8'><span>Primary color button</span></button>
      <button className='btn btn-error rounded-8'>Error color button</button>
      <button className='btn rounded-8' disabled>Diabled button</button>
      <button className='btn btn-20percent-background rounded-8'>20 percent white button</button>
      <button className='btn btn-transparent-bg rounded-8'>Transparent background button</button>
      <button className='btn rounded-8 btn-lbl-primary'>No border button, lbl color primary</button>
      <button className='btn rounded-8 btn-lbl-primary-container'>No border button, lbl color primary container</button>
    </div>
  );
}

export default App;
