package entity

type Investor struct {
	ID            string
	Name          string
	AssetPosition []*InvestorAssetPosition
}

func NewInvestor(id string, name string) *Investor {
	return &Investor{
		ID:            id,
		Name:          name,
		AssetPosition: []*InvestorAssetPosition{},
	}
}

func (i *Investor) AddAssetPosition(assetPosition *InvestorAssetPosition) {
	i.AssetPosition = append(i.AssetPosition, assetPosition)
}

func (i *Investor) AdjustAssetPosition(assetId string, totalOfShares int) {
	assetPosition := i.GetAssetPosition(assetId)

	if assetPosition == nil {
		i.AssetPosition = append(i.AssetPosition, NewInvestorAssetPosition(assetId, totalOfShares))
	} else {
		assetPosition.AddShares(totalOfShares)
	}
}

func NewInvestorAssetPosition(assetId string, totalOfShares int) *InvestorAssetPosition {
	return &InvestorAssetPosition{
		AssetID: assetId,
		Shares:  totalOfShares,
	}

}

func (investor *Investor) GetAssetPosition(assetId string) *InvestorAssetPosition {
	for _, assetPosition := range investor.AssetPosition {
		if assetPosition.AssetID == assetId {
			return assetPosition
		}
	}
	return nil
}

func (i *InvestorAssetPosition) AddShares(shares int) {
	i.Shares += shares
}

type InvestorAssetPosition struct {
	AssetID string
	Shares  int
}
