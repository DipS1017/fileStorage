
"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShareFileModalProps } from "@/types";

export function ShareFileModal({ isOpen, onClose, fileId }: ShareFileModalProps) {
  const [shareType, setShareType] = useState<"user" | "email">("user");
  const [selectedUser, setSelectedUser] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the data to send
    const data = {
      shareType,
      selectedUser: shareType === "user" ? selectedUser : null,
      email: shareType === "email" ? email : null,
      fileId,
    };

    try {
      // Send data to the backend
      const response = await fetch("/api/share/share-file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        // Handle success, e.g., show success notification or close modal
        console.log("File shared:", result);
        onClose(); // Close modal on success
      } else {
        // Handle error
        console.log("Error sharing file:", result.error);
      }
    } catch (error) {
      console.error("Error sharing file:", error);
    }
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
          <Button type="submit" className="w-full">
            Share
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

