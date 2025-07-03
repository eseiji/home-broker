package entity

type Order struct {
	ID            string
	Investor      *Investor
	Asset         *Asset
	Shares        int
	PendingShares int
	Price         float64
	OrderType     string
	Status        string
	Transactions  []*Transaction
}

func NewOrder(id string, investor *Investor, asset *Asset, shares int, price float64, orderType string) *Order {
	return &Order{
		ID:            id,
		Investor:      investor,
		Asset:         asset,
		Shares:        shares,
		PendingShares: shares,
		Price:         price,
		OrderType:     orderType,
		Status:        "OPEN",
		Transactions:  []*Transaction{},
	}
}

func (order *Order) ApplyTrade(tradedShares int) {
	if tradedShares > order.PendingShares {
		tradedShares = order.PendingShares
	}

	order.PendingShares -= tradedShares

	if order.PendingShares == 0 {
		order.Status = "CLOSED"
	}
}

func (order *Order) AddTransaction(transaction *Transaction) {
	order.Transactions = append(order.Transactions, transaction)
}
