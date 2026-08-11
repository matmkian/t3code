# Organizing threads

On web and desktop, the default sidebar organizes threads into **Active** and **Settled** sections.
Use **New chat** to start a thread or **New project** to add another project.

Select **Search** below **New project** to replace that row with a search field. Press **Escape** or
select the close button to restore the Search row. The filter beside **Projects** limits the list to
one project; choose **All projects** to clear the filter.

Sidebar navigation follows the current theme for its hover, pressed, disabled, and active states.
**New chat** is active while a draft is open, the footer marks the current navigation view, and
Settings marks the current settings section.

Development builds use the standard sidebar header. Nightly builds can use environment artwork,
and either build can instead be identified with a version pill from appearance settings.

The icon beside a thread's project name shows where it runs: a monitor means your local computer,
and a server means a remote environment.

The icon beside the branch name shows how the thread is checked out: a branch means the current
checkout, and a folder with a branch means a worktree. When the branch has a pull request, its
number appears at the end of the branch row.

The badges at the top of a thread show its current state and provider. Active work shows its
elapsed time, completed work shows **Done**, and inactive work shows the most recent timestamp.
The provider is represented by its icon. Hover a thread to replace those badges with the available
**Snooze** and **Settle** actions; the thread card keeps the same size while the actions are visible.

Pin a thread from its context menu to keep it in the pinned section above your active work.
Pinned threads are shown independently of their project, including when you connect to more than
one environment.

On web and desktop, drag a pinned thread to change its position. On mobile, open the thread's menu
and choose **Move up** or **Move down**. The order is stored by the server and appears on your
other connected devices.

If reordering is unavailable for one environment, update the T3 Code server running in that
environment. Older servers can still pin and unpin threads, but do not understand synced ordering;
their pinned threads keep the default newest-first order below the ones you have arranged.
