
import './App.css';
import { TonConnectUIProvider, useTonConnectUI } from '@tonconnect/ui-react';

declare global {
  interface Window {
    Telegram: any;
  }
}

function GameWithPayment() {
  const [tonConnectUI] = useTonConnectUI();
  const tg = window.Telegram?.WebApp;

  const handleUSDTDeposit = async () => {
    if (!tonConnectUI) {
      console.log('钱包未连接');
      return;
    }
    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 300,
      messages: [
        {
          address: '这里填写你接收USDT的钱包地址', // 替换成你的地址
          amount: '10000000', // 10 USDT
          payload: '订单ID，用于查询',
        },
      ],
    };
    try {
      await tonConnectUI.sendTransaction(transaction);
      tg?.showPopup({ title: '成功', message: '充值请求已发送！' });
    } catch (e) {
      console.error(e);
      tg?.showPopup({ title: '失败', message: '交易被取消或失败。' });
    }
  };

  return (
    <div className="App">
      {/* 游戏嵌入区 */}
      <iframe
        src="https://x6bmh.com/"
        title="官方首页"
        style={{
          width: '100%',
          height: 'calc(100vh - 70px)',
          border: 'none',
        }}
      />
      {/* 底部按钮栏 */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '60px',
        background: '#fff',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 100,
      }}>
        <button onClick={handleUSDTDeposit} style={{ padding: '8px 16px', borderRadius: '8px' }}>
          💰 充值 USDT
        </button>
        <button style={{ padding: '8px 16px', borderRadius: '8px' }}>
          ⭐ 购买道具 (即将开放)
        </button>
        <button style={{ padding: '8px 16px', borderRadius: '8px' }}>
          📱 下载游戏APP
        </button>
      </div>
    </div>
  );
}

function App() {
  const manifestUrl = 'https://你的网站地址.com/tonconnect-manifest.json';
  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <GameWithPayment />
    </TonConnectUIProvider>
  );
}

export default App;