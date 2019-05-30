# 0.1.1

- fix: avoid re-renders caused by config provider

  Merging the two objects in FilejetProvider caused a re-render for every consumer. Fixed code implements a PureComponent to avoid this issue.

# 0.1.0

- initial release
