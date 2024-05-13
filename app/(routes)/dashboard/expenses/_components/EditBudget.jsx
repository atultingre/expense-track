"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { toast } from "sonner";
import { Budgets } from "@/utils/schema";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { eq } from "drizzle-orm";

const EditBudget = ({ budgetInfo, refreshData }) => {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState();
  const [amount, setAmount] = useState();

  useEffect(() => {
    if (budgetInfo) {
      setName(budgetInfo?.name);
      setAmount(budgetInfo?.amount);
      setEmojiIcon(budgetInfo?.icon);
    }
  }, [budgetInfo]);

  /**
   * Use to upate the budget
   */
  const onUpdateBudget = async () => {
    const result = await db
      .update(Budgets)
      .set({
        name: name,
        amount: amount,
        icon: emojiIcon,
      })
      .where(eq(Budgets.id, budgetInfo.id))
      .returning();

    if (result) {
      refreshData();
      toast(name + " Budget Updated!");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex gap-2 items-center">
            <PenBox />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div className="absolute mt-1 z-10">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
              </div>
              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Budget Name</h2>
                <Input
                  defaultValue={budgetInfo?.name}
                  placeholder="e.g. Home Decor"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Budget Amount</h2>
                <Input
                  type="number"
                  defaultValue={budgetInfo?.amount}
                  placeholder="e.g. ₹ 5000"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                className="mt-5 w-full"
                onClick={() => onUpdateBudget()}
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBudget;
