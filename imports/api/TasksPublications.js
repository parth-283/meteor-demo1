import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./Collections/TasksCollection";

Meteor.publish("tasks", function () {
    const userId = this.userId;

    if (!userId) {
        return this.ready();
    }

    return TasksCollection.find({ userId });
});