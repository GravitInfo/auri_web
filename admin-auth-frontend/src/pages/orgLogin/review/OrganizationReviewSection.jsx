import React, { useState } from "react";
import OrganizationAddReview from "./OrganizationAddReview";
import OrganizationReviewList from "./OrganizationReviewList";

export default function OrganizationReviewSection({ orgId }) {
  const [refresh, setRefresh] = useState(0);

  const handleAdded = () => setRefresh((p) => p + 1);

  return (
    <div>
      <OrganizationAddReview orgId={orgId} onReviewAdded={handleAdded} />
      <OrganizationReviewList orgId={orgId} refresh={refresh} />
    </div>
  );
}
