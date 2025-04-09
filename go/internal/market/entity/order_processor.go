package entity

type OrderProcessor struct {
	Transaction *Transaction
}

func NewOrderProcessor(transaction *Transaction) *OrderProcessor {
	return &OrderProcessor{
		Transaction: transaction,
	}
}

func (orderProcessor *OrderProcessor) Process() {
	shares := orderProcessor.calculateShares()
	orderProcessor.updatePositions(shares)
	orderProcessor.updateOrders(shares)

	orderProcessor.Transaction.Total = float64(shares) * orderProcessor.Transaction.Price
}

func (orderProcessor OrderProcessor) calculateShares() int {
	availableShares := orderProcessor.Transaction.Shares

	if orderProcessor.Transaction.BuyOrder.PendingShares < availableShares {
		availableShares = orderProcessor.Transaction.BuyOrder.PendingShares
	}

	if orderProcessor.Transaction.SellOrder.PendingShares < availableShares {
		availableShares = orderProcessor.Transaction.SellOrder.PendingShares
	}

	return availableShares

}

func (op *OrderProcessor) updatePositions(shares int) {
	op.Transaction.SellOrder.Investor.AdjustAssetPosition(op.Transaction.SellOrder.Asset.ID, -shares)
	op.Transaction.BuyOrder.Investor.AdjustAssetPosition(op.Transaction.BuyOrder.Asset.ID, shares)
}

func (op *OrderProcessor) updateOrders(shares int) {
	op.Transaction.BuyOrder.ApplyTrade(shares)
	op.Transaction.SellOrder.ApplyTrade(shares)
}
