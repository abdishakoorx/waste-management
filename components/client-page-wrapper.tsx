"use client";
import { SkipSelectionPage } from "@/components/skip-selection/skip-selection-page";
import { Skip } from "@/types/skip.types";

type Props = {
  locationParams: {
    postcode: string;
    area: string;
  };
};

export default function ClientPage({ locationParams }: Props) {
  const handleSkipSelected = (skip: Skip | null) => {
    if (skip) {
      console.log("Skip selected:", skip);
    } else {
      console.log("Skip deselected");
    }
  };

  const handleBack = () => {
    console.log("Back clicked");
  };

  const handleContinue = (skip: Skip) => {
    console.log("Continue with skip:", skip);
  };

  return (
    <SkipSelectionPage
      locationParams={locationParams}
      onSkipSelected={handleSkipSelected}
      onBack={handleBack}
      onContinue={handleContinue}
    />
  );
}
