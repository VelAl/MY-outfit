import { DollarSign, Headset, ShoppingBag, WalletCards } from "lucide-react";

import { Card, CardContent } from "../../ui/card";

const structure = [
  {
    title: "Free Shipping",
    description: "Free shipping on orders above $100",
    Icn: ShoppingBag,
  },
  {
    title: "Money Back Guarantee",
    description: "Within 30 days of purchase",
    Icn: DollarSign,
  },
  {
    title: "Flexible Payment",
    description: "Pay with credit card, Paypal or cash on delivery",
    Icn: WalletCards,
  },
  {
    title: "24/7 Support",
    description: "Get support at any time",
    Icn: Headset,
  },
] as const;

const IconBoxes = () => {
  return (
    <div>
      <Card>
        <CardContent className="grid md:grid-cols-4 gap-4 p-4">
          {structure.map(({ Icn, description, title }) => (
            <div className="space-y-2" key={title}>
              <div className="flex gap-2 items-center">
                <Icn />
                <div className="text-sm font-bold">{title}</div>
                <div className="md:hidden text-sm text-muted-foreground">
                  {description}
                </div>
              </div>

              <div className="hidden md:block text-sm text-muted-foreground">
                {description}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
export default IconBoxes;
