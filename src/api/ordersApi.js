const ORDER_DELAY_MS = 800;

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function createOrder(orderData) {
  await wait(ORDER_DELAY_MS);

  return {
    id: Date.now(),
    status: 'created',
    createdAt: new Date().toISOString(),
    ...orderData
  };
}
