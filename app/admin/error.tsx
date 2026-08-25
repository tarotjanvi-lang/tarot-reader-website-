"use client";

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <div className="admin-error" role="alert">
      <div className="admin-eyebrow">Connection interrupted</div>
      <h1>Admin data is temporarily unavailable</h1>
      <p>
        The database could not be reached. Check the MongoDB Atlas connection and try again.
      </p>
      <button type="button" className="btn btn-primary" onClick={() => reset()}>
        Try Again
      </button>
    </div>
  );
}
