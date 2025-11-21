// ParentComponent.jsx
import React, { useState } from "react";
import AddReview from "./Reviews/AddReview";
import ReviewList from "./Reviews/ReviewList";

const ParentComponent = ({ organizationId, user }) => {
  const [refresh, setRefresh] = useState(0);

  const handleReviewAdded = () => {
    setRefresh(prev => prev + 1); // trigger re-fetch in ReviewList
  };

  return (
    <div>
      <AddReview 
        organizationId={organizationId} 
        user={user} 
        onReviewAdded={handleReviewAdded} 
      />
      <ReviewList organizationId={organizationId} refresh={refresh} />
    </div>
  );
};

export default ParentComponent;
