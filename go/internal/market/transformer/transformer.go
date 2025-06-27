package transformer

import (
	"homebroker/internal/market/dto"
	"homebroker/internal/market/entity"
)

func TransformInput(input dto.TradeInput) *entity.Order {
	asset := entity.NewAsset(input.AssetID, input.AssetID, 1000)
	investor := entity.NewInvestor(input.InvestorID, input.InvestorID)
	order := entity.NewOrder(input.OrderID, investor, asset, input.Shares, input.Price, input.OrderType)
	if input.CurrentShares > 0 {
		assetPosition := entity.NewInvestorAssetPosition(input.AssetID, input.CurrentShares)
		investor.AddAssetPosition(assetPosition)
	}
	return order
}

func TranformOutput(order *entity.Order) *dto.OrderOutput {
	output := &dto.OrderOutput{
		OrderID: order.ID,
		InvestorID: order.Investor.ID,
		AssetID: order.Asset.ID,
		OrderType: order.OrderType,
		Status: order.Status,
		PartialShares: order.PendingShares,
		Shares: order.Shares,
	}

	var transactionsOutput []*dto.TransactionOutput
	for _, transaction := range order.Transactions {
		transactionOutput := &dto.TransactionOutput{
			TransactionID: transaction.ID,
			BuyerID: transaction.BuyOrder.Investor.ID,
			SellerID: transaction.SellOrder.Investor.ID,
			AssetID: transaction.SellOrder.Asset.ID,
			Price: transaction.Price,
			Shares: transaction.Shares,
			
		}
		transactionsOutput = append(transactionsOutput, transactionOutput)
	}
	output.TransactionsOutput = transactionsOutput
	return output
}