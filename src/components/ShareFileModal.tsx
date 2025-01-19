
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShareFileModalProps } from "@/types";
import { useMutation } from "@tanstack/react-query";

// Helper function for sharing the file
const shareFile = async (data: {  selectedUser: string | null, email: string | null, fileId: string }) => {
  const response = await fetch("/api/share/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error sharing file");
  }

  return response.json(); // Return response body for further handling
};

export function ShareFileModal({ isOpen, onClose, fileId }: ShareFileModalProps) {
  const [shareType, setShareType] = useState<"user" | "email">("user");
  const [selectedUser, setSelectedUser] = useState("");
  const [email, setEmail] = useState("");

  // Setup the mutation for sharing the file
  const { mutate,isPending,  isError, error } = useMutation({
    mutationFn: shareFile,
    onSuccess: (result) => {
      console.log("File shared:", result);
      onClose(); // Close modal on success
    },
    onError: (error) => {
      console.error("Error sharing file:", error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the data to send
    const data = {
      shareType,
      selectedUser: shareType === "user" ? selectedUser : null,
      email: shareType === "email" ? email : null,
      fileId,
    };

    // Trigger the mutation
    mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share File</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shareType">Share with</Label>
            <Select
              value={shareType}
              onValueChange={(value: "user" | "email") => setShareType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select share type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">Existing User</SelectItem>
                <SelectItem value="email">Email Address</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {shareType === "user" ? (
            <div className="space-y-2">
              <Label htmlFor="user">Select User</Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user1">User 1</SelectItem>
                  <SelectItem value="user2">User 2</SelectItem>
                  <SelectItem value="user3">User 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending? "Sharing..." : "Share"}
          </Button>
          {isError && (
            <div className="text-red-500 mt-2">
              {error instanceof Error ? error.message : "An error occurred"}
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}

